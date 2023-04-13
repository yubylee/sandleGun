package bitcamp.myapp.vo;

import java.sql.Date;
import lombok.Data;

@Data
public class MountainInfo {
  private int no;
  private int regionId;
  private String mountainName;
  private String height;
  private String photo;
  private String address;
  private Date sunrise;
  private Date sunset;
}