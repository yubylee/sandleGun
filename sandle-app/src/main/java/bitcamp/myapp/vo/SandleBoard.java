package bitcamp.myapp.vo;

import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class SandleBoard {
  private int no;
  private String title;
  private String content;
  private String tag;
  private String photo;

  //Jackson 라이브러리가 Date 타입 값을 JSON 문자열로 변환할 때 사용할 규칙을 설정한다.
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd")
  private Date createdDate;

  private int viewCount;
  private Member writer;
  private List<Comment> comments;
}
