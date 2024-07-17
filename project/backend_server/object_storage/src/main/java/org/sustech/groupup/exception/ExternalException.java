package org.sustech.groupup.exception;




import org.sustech.groupup.utils.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ExternalException extends RuntimeException{
    private Response response;
}
