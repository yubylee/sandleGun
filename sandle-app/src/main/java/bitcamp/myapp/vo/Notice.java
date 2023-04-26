package bitcamp.myapp.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Notice {
  private int boardId;
  private int boardCategoryId;
  private String memberId;
  private String title;
  private String content;

  @JsonFormat(
    shape = Shape.STRING,
    pattern = "yyyy-MM-dd")
  private Date createdDate;
}