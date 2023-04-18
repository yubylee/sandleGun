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
import org.springframework.web.bind.annotation.RequestBody;
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
      @RequestBody SandleBoard sandleBoard,
      List<MultipartFile> files,
      HttpSession session) {

    Member loginUser = (Member) session.getAttribute("loginUser");
    SandleBoard board = new SandleBoard();
    board.setWriterNo(loginUser.getNo());
    board.setNickname(loginUser.getNickname());

    List<BoardFile> boardFiles = new ArrayList<>();
    for (MultipartFile file : files) {
      String filename = objectStorageService.uploadFile(bucketName, "photofeed/", file);
      if (filename == null) {
        continue;
      }

      BoardFile boardFile = new BoardFile();
      boardFile.setOriginalFilename(file.getOriginalFilename());
      boardFile.setFilepath(filename);
      boardFile.setMimeType(file.getContentType());
      boardFiles.add(boardFile);
    }
    board.setAttachedFiles(boardFiles);


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

}
