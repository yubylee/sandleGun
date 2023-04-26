package bitcamp.myapp.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class MountainInfo {
  private int no;
  private String mountainName;
  private String height;
  private String photo;
  private String address;
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd HH:mm:ss")
  private Date sunrise;
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd HH:mm:ss")
  private Date sunset;

  private int regionId;
  private String regionList;

  private int courseNo;
  private String courseName;
  private String coursePath;
  private String length;
  private String time;
  private String level;
}
