//package bitcamp.myapp.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import bitcamp.myapp.service.BoardLikeService;
//import bitcamp.myapp.vo.BoardLike;
//import bitcamp.myapp.vo.Member;
//import bitcamp.util.ErrorCode;
//import bitcamp.util.RestResult;
//import bitcamp.util.RestStatus;
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@RequestMapping("/boardlikes")
//public class BoardLikeController {
//  @Autowired private BoardLikeService boardLikeService ;
//
//  @PostMapping
//  public Object insert(@RequestBody BoardLike boardLike,
//      HttpSession session) {
//    Member loginUser = (Member) session.getAttribute("loginUser");
//
//    if(loginUser == null) {
//      return new RestResult()
//          .setStatus(RestStatus.FAILURE)
//          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
//          .setData("로그인하세요");
//    }
//    boardLike.setMemberNo(loginUser.getNo());
//    boardLikeService.like(boardLike);
//
//    return new RestResult()
//        .setStatus(RestStatus.SUCCESS);
//  };
//
//  @DeleteMapping("{no}")
//  public Object delete(@PathVariable int no, HttpSession session) {
//    Member loginUser = (Member) session.getAttribute("loginUSer");
//
//    if (loginUser == null) {
//      return new RestResult()
//          .setStatus(RestStatus.FAILURE)
//          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
//          .setData("로그인하세요");
//    }
//
//    BoardLike boardLike = new BoardLike();
//    boardLike.setMemberNo(loginUser.getNo());
//    boardLike.setBoardNo(no);
//    boardLikeService.disLike(boardLike);
//
//    return new RestResult()
//        .setStatus(RestStatus.SUCCESS);
//  }
//}
