package com.sustech.groupup.annotation;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.sustech.groupup.utils.JsonToStringDeserializer;

@JsonSerialize(using = ToStringSerializer.class)
@JsonDeserialize(using = JsonToStringDeserializer.class)
public @interface JsonToStringField {

}
