package com.sustech.groupup.controller;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.service.CacheService;
import com.sustech.groupup.utils.Response;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

@Slf4j
@RestController
@RequestMapping(Constant.API_VERSION + "/object")
@RequiredArgsConstructor
public class S3Controller {
    private final CacheService cacheService;

    @Value("${aws.bucket-name}")
    private String BUCKET_NAME;

    @Value("${aws.region}")
    private String REGION;

    @Value("${aws.access-key-id}")
    private String ACCESS_KEY_ID;

    @Value("${aws.secret-access-key}")
    private String SECRET_ACCESS_KEY;
    private S3Client s3;

    @Value("${aws.session-token}")
    private String SESSION_TOKEN;

    @PostConstruct
    public void init() {
        AwsSessionCredentials awsCreds = AwsSessionCredentials.create(ACCESS_KEY_ID, SECRET_ACCESS_KEY, SESSION_TOKEN);
        this.s3 = S3Client.builder()
                          .region(Region.of(REGION))
                          .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                          .build();
    }

    @PostMapping
    public Response uploadObject(String key,
                                 @RequestParam("file") MultipartFile file) throws IOException {
        //PutObjectRequest putObjectRequest = PutObjectRequest.builder()
        //                                                    .bucket(BUCKET_NAME)
        //                                                    .key(key)
        //                                                    .build();
        //
        //Path tempFile = Files.createTempFile("temp", file.getOriginalFilename());
        //file.transferTo(tempFile.toFile());
        //
        //PutObjectResponse response = s3.putObject(putObjectRequest, tempFile);
        //Files.delete(tempFile);
        //
        //assert response.sdkHttpResponse().isSuccessful();
        //return Response.getSuccess();
        //cacheService.save(key, file.getBytes());
        //PutObjectRequest putObjectRequest = PutObjectRequest.builder()
        //                                                    .bucket(BUCKET_NAME)
        //                                                    .key(key)
        //                                                    .build();
        //
        //// 使用MultipartFile的输入流直接上传
        //try (InputStream inputStream = file.getInputStream()) {
        //    PutObjectResponse response = s3.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
        //    assert response.sdkHttpResponse().isSuccessful();
        //}
        //
        //return Response.getSuccess();
        // 使用并行流或CompletableFuture进行并行处理
        CompletableFuture<Void> cacheFuture = CompletableFuture.runAsync(() -> {
            try {
                cacheService.save(key, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        CompletableFuture<PutObjectResponse> s3Future = CompletableFuture.supplyAsync(() -> {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                                                                .bucket(BUCKET_NAME)
                                                                .key(key)
                                                                .build();
            try (InputStream inputStream = file.getInputStream()) {
                return s3.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        // 等待所有操作完成
        CompletableFuture.allOf(cacheFuture, s3Future).join();

        // 检查S3上传结果
        PutObjectResponse s3Response = s3Future.join();
        assert s3Response.sdkHttpResponse().isSuccessful();

        return Response.getSuccess();
    }

    @PutMapping
    public Response updateObject(String key,
                                 @RequestParam("file") MultipartFile file) throws IOException {
        return uploadObject(key, file);
    }

    @GetMapping
    public ResponseEntity<InputStreamResource> getObject(String key) throws
                                                                     IOException {
        //200 on success, 404 on not-exists
        //Path tempDir = Files.createTempDirectory("s3file-");
        //
        //GetObjectRequest getObjectRequest = GetObjectRequest.builder()
        //                                                    .bucket(BUCKET_NAME)
        //                                                    .key(key)
        //                                                    .build();
        //
        //try {
        //    s3.getObject(getObjectRequest, tempDir);
        //}catch (NoSuchKeyException e) {
        //    return ResponseEntity.notFound().build();
        //}
        //
        //InputStreamResource resource =
        //        new InputStreamResource(new FileInputStream(tempDir.toFile()));
        //
        //return ResponseEntity.ok()
        //                     .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + key)
        //                     .contentType(MediaType.APPLICATION_OCTET_STREAM)
        //                     .contentLength(Files.size(tempDir))
        //                     .body(resource);
        var bytes = cacheService.get(key);
        if (bytes != null) { // from cache
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
            InputStreamResource inputStreamResource = new InputStreamResource(byteArrayInputStream);
            return ResponseEntity.ok()
                                 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + key)
                                 .contentType(MediaType.APPLICATION_OCTET_STREAM)
                                 .contentLength(bytes.length)
                                 .body(inputStreamResource);
        }


        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                                                            .bucket(BUCKET_NAME)
                                                            .key(key)
                                                            .build();
        //TODO 存入cache
        try {
            ResponseInputStream<GetObjectResponse> s3Object = s3.getObject(getObjectRequest);
            InputStreamResource resource = new InputStreamResource(s3Object);

            return ResponseEntity.ok()
                                 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + key)
                                 .contentType(MediaType.APPLICATION_OCTET_STREAM)
                                 .contentLength(s3Object.response().contentLength())
                                 .body(resource);
        } catch (NoSuchKeyException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public Response deleteObject(String key) {
        cacheService.remove(key);
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                                                                     .bucket(BUCKET_NAME)
                                                                     .key(key)
                                                                     .build();
        s3.deleteObject(deleteObjectRequest);
        return Response.getSuccess();
    }
}
