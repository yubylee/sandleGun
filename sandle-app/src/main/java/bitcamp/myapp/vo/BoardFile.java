package bitcamp.myapp.vo;

import lombok.Data;

@Data
public class BoardFile {
  private int photoNo;
  private int boardNo;
  private String filepath;
  private String originalFilename;
  private String mimeType;
}
