package bitcamp.myapp.vo;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class SandleBoard implements Serializable {
  private static final long serialVersionUID = 1L;
  private int no;

  private String content;
  private String tag;
  private String fileName;


  //Jackson 라이브러리가 Date 타입 값을 JSON 문자열로 변환할 때 사용할 규칙을 설정한다.
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd",
      timezone = "Asia/Seoul")
  private Date createdDate;
  private Member writer;
  private int viewCount;
  private int writerNo;
  private int likeCount;
  private String writerEmail;
  private String nickname;
  private String profilePhoto;
  private List<Comment> comments;
  private List<BoardFile> attachedFiles;
}
