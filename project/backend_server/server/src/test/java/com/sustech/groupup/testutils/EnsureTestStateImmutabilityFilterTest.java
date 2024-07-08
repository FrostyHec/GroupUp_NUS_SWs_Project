package com.sustech.groupup.testutils;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.sustech.groupup.testutils.mapper.DatabaseManager;

import jakarta.annotation.PostConstruct;

public class EnsureTestStateImmutabilityFilterTest implements BeforeEachCallback, AfterEachCallback {
    @Autowired
    private DatabaseManager databaseManager;
    @Override
    public void beforeEach(ExtensionContext context) {
        if (databaseManager == null) {
            databaseManager = SpringExtension.getApplicationContext(context).getBean(DatabaseManager.class);
        }
        databaseManager.clearDatabase();
    }

    @Override
    public void afterEach(ExtensionContext context) {
        if (databaseManager == null) {
            databaseManager = SpringExtension.getApplicationContext(context).getBean(DatabaseManager.class);
        }
        databaseManager.clearDatabase();
    }
}
