package bitcamp.myapp.vo;

import lombok.Data;

@Data
public class MountainInfo {
	private int no;
	private String mountainName;
	private String height;
	private String photo;
	private String address;

	private int regionId;
	private String regionList;

	private int courseNo;
	private String courseName;
	private String coursePath;
	private String length;
	private String time;
	private String level;
}
