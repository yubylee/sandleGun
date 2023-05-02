package bitcamp.myapp.vo;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Data;

@Data
public class Qna implements Serializable {
	private static final long serialVersionUID = 1L;

	private int no;
	private int memberId;
	private String title;
	private String content;
	private String response;

	@JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Date createdDate;

	//  private int viewCount;
	private int writerNo;
	private String nickname;
	private Member writer;
}
