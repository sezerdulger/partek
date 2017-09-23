package com.sdulger.util;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class ClassUtil {
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Object invokeMethod(Object obj, String methodName,List<Class> types, List inputs) throws Exception {
		Class cls = obj.getClass();
		
		if (inputs != null && types != null) {
			Method method = cls.getDeclaredMethod(methodName, types.toArray(new Class[types.size()]));
			return method.invoke(obj, inputs.toArray());
		}
		else {
			Method method = cls.getDeclaredMethod(methodName, new Class[]{});
			return method.invoke(obj, null);
		}
	}
	
	public static Object retrieveAttrValue(Object obj, String attrName) throws Exception {
		return invokeMethod(obj, "get" + StringUtil.capitalize(attrName), Arrays.asList(new Class[]{}), Arrays.asList(new Object[]{}));
	}
	
	@SuppressWarnings("rawtypes")
	public static void setAttrValue(Object obj, String attrName, Object value) throws Exception {
		if (value != null) {
			Class cls = value.getClass();
			if (cls == ArrayList.class) {
				cls = List.class;
			}
			invokeMethod(obj, "set" + StringUtil.capitalize(attrName), Arrays.asList(new Class[]{cls}), Arrays.asList(new Object[]{value}));
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static void setAttrValueToNull(Object obj, String attrName, Class cls) throws Exception {
		invokeMethod(obj, "set" + StringUtil.capitalize(attrName), Arrays.asList(new Class[]{cls}), Arrays.asList(new Object[]{null}));
	}
	
	@SuppressWarnings("rawtypes")
	public static void setAttrValue(Object obj, Field field, Object value) throws Exception {
		
		Class cls = field.getType();
		
		invokeMethod(obj, "set" + StringUtil.capitalize(field.getName()), Arrays.asList(new Class[]{cls}), Arrays.asList(new Object[]{value}));
	}
	
	@SuppressWarnings("rawtypes")
	public static Object retrieveAnnotationAttr(Object obj, Class anntCls, String attrName) throws Exception {
		Class cls = obj.getClass();
		return retrieveAnnotationAttr(cls, anntCls, attrName);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Object retrieveAnnotationAttr(Class cls, Class anntCls, String attrName) throws Exception {
		if (cls.isAnnotationPresent(anntCls)) {
			Annotation annotation = cls.getAnnotation(anntCls);
			
			return invokeMethod(annotation, attrName, Arrays.asList(new Class[]{}), Arrays.asList(new Object[]{}));
		}
		return null;
	}
}
