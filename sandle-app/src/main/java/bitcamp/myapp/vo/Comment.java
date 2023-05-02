package bitcamp.myapp.vo;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Data;

@Data
public class Comment {
	private int no;
	private int boardNo;
	private String commentContent;
	//Jackson 라이브러리가 Date 타입 값을 JSON 문자열로 변환할 때 사용할 규칙을 설정한다.
	@JsonFormat(
			shape = Shape.STRING,
			pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date createdDate;

	private int writerNo;
	private String nickname;
	private String profilePhoto;
}
