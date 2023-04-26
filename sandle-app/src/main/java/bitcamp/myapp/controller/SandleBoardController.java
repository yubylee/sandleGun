package bitcamp.myapp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import bitcamp.myapp.service.ObjectStorageService;
import bitcamp.myapp.service.SandleBoardService;
import bitcamp.myapp.vo.BoardFile;
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
  @Autowired private ObjectStorageService objectStorageService;
  private String bucketName = "sandle-images";

  @PostMapping("/post")
  public Object insert(
      SandleBoard sandleBoard,
      List<MultipartFile> files,
      HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");
    sandleBoard.setWriterNo(loginUser.getNo());
    sandleBoard.setNickname(loginUser.getNickname());
    System.out.println(files);

    List<BoardFile> boardFiles = new ArrayList<>();
    for (MultipartFile file : files) {
      String filename = objectStorageService.uploadFile(bucketName, "photofeed/", file);
      System.out.println(file);
      if (filename == null) {
        continue;
      }

      //      sandleBoard.setFileName(filename);


      BoardFile boardFile = new BoardFile();
      //      boardFile.setOriginalFilename(file.getOriginalFilename());
      boardFile.setPhoto(filename);
      //      boardFile.setMimeType(file.getContentType());
      boardFiles.add(boardFile);
    }

    sandleBoard.setAttachedFiles(boardFiles);

    sandleBoardService.add(sandleBoard);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


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

  @GetMapping("/userBoard")
  public Object listUserBoard(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(sandleBoardService.listUserBoard(loginUser.getNo()));
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


    //    System.out.println("받음");
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

  @DeleteMapping("{no}/userBoard/")
  public Object deleteUserBoard(
      @PathVariable int no) {
    sandleBoardService.deleteUserBoard(no);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PutMapping("{no}/update/")
  public Object update(
      @PathVariable int no,
      SandleBoard sandleBoard,
      MultipartFile files) throws Exception {

    // URL 의 번호와 요청 파라미터의 번호가 다를 경우를 방지하기 위해
    // URL의 번호를 게시글 번호로 설정한다.
    //    board.setNo(no);


    String filename = objectStorageService.uploadFile(bucketName, "photofeed/", files);

    sandleBoard.setFileName(filename);

    sandleBoardService.update(sandleBoard);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);

  }


}
