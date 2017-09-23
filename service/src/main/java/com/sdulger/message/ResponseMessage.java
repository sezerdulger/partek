package com.sdulger.message;

import java.util.List;
import java.util.Vector;

public class ResponseMessage {
	public Vector restList;
	public Long count;
	public List list;
	public Boolean success;
	public Object data;
	public String message;
	
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("\n restList:" + restList);
		sb.append("\n count:" + count);
		sb.append("\n list:" + list);
		sb.append("\n success:" + success);
		sb.append("\n data:" + data);
		sb.append("\n messsage:" + message);
		return sb.toString();
	}
}
