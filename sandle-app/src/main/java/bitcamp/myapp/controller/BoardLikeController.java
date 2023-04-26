package bitcamp.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.BoardLikeService;
import bitcamp.myapp.vo.BoardLike;
import bitcamp.myapp.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/likes")
public class BoardLikeController {
  @Autowired private BoardLikeService boardLikeService;

  @GetMapping("{no}")
  public Object likeState(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인하세요");
    }

    BoardLike boardLike = new BoardLike();
    boardLike.setMemberNo(loginUser.getNo());
    boardLike.setBoardNo(no);
    if(!boardLikeService.likeState(boardLike)) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("disLike");
    }
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData("Like");
  }

  @GetMapping("{no}/count/")
  public Object likeCount(@PathVariable int no) {

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(boardLikeService.likeCount(no));
  }

  @PostMapping
  public Object insert(@RequestBody BoardLike boardLike,
      HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if(loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인하세요");
    }
    boardLike.setMemberNo(loginUser.getNo());
    boardLikeService.like(boardLike);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  };


  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    System.out.println("딜리트받음");
    //    System.out.println(loginUser.getNo());
    System.out.println(no);

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인하세요");
    }
    System.out.println(loginUser.getNo());
    BoardLike boardLike = new BoardLike();
    boardLike.setMemberNo(loginUser.getNo());
    boardLike.setBoardNo(no);
    boardLikeService.disLike(boardLike);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}