package bitcamp.myapp.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.SandleBoardService;
import bitcamp.myapp.vo.Comment;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.SandleBoard;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/sandleboards")
public class SandleBoardController {

  @Autowired private SandleBoardService sandleBoardService;


  @GetMapping("{no}")
  public Object view(@PathVariable int no, HttpSession session) {
    SandleBoard board = sandleBoardService.get(no);
    Map<String, Object> data = new HashMap<>();
    data.put("loginUser", session.getAttribute("loginUser"));
    data.put("board", board);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(data);
  }

  @GetMapping
  public Object list() {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(sandleBoardService.list());
  }

  @PostMapping
  public Object insert(
      @RequestParam String content,
      @RequestParam int boardNo,
      HttpSession session) {

    Comment comment = new Comment();
    Member loginUser = (Member) session.getAttribute("loginUser");
    comment.setWriterNo(loginUser.getNo());
    comment.setNickname(loginUser.getNickname());
    comment.setBoardNo(boardNo);
    comment.setCommentContent(content);

    System.out.println(comment);

    sandleBoardService.addComment(comment);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object commentdelete(
      @PathVariable int no,
      HttpSession session
      ) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    Comment old = sandleBoardService.getComment(no);


    System.out.println("받음");
    System.out.println(old.getWriterNo());
    System.out.println(loginUser.getNo());
    if (old.getWriterNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");

    } else {
      sandleBoardService.deleteComment(no);
      return new RestResult()
          .setStatus(RestStatus.SUCCESS);
    }
  }

}
