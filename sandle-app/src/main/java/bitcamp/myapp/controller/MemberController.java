package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.service.ObjectStorageService;
import bitcamp.myapp.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/members")
public class MemberController {

  Logger log = LogManager.getLogger(getClass());

  @Autowired private MemberService memberService;
  @Autowired private ObjectStorageService objectStorageService;
  private String bucketName = "sandle-images";

  @PostMapping
  public Object insert(@RequestBody Member member) {
    memberService.add(member);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping
  public Object list(String keyword) {
    log.debug("BoardController.list() 호출됨!");

    // MappingJackson2HttpMessageConverter 가 jackson 라이브러리를 이용해
    // 자바 객체를 JSON 문자열로 변환하여 클라이언트로 보낸다.
    // 이 컨버터를 사용하면 굳이 UTF-8 변환을 설정할 필요가 없다.
    // 즉 produces = "application/json;charset=UTF-8" 를 설정하지 않아도 된다.
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.list(keyword));
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    Member member = memberService.get(no);
    if (member != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(member);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.NO_DATA);
    }
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      MultipartFile profilePhoto,
      HttpSession session) {
    System.out.println(profilePhoto);

    String filename = objectStorageService.uploadFile(bucketName, "profile-photo/", profilePhoto);

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (filename != null) {
      loginUser.setProfilePhoto(filename);
    }

    memberService.updateProfile(loginUser);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Member old = memberService.get(no);
    if (old.getNickname() != loginUser.getNickname()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }
    memberService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/idCheck")
  public int idCheck(@RequestParam("email") String email) {
    System.out.println("id##########" + email);
    int cnt = memberService.idCheck(email);
    return cnt;
  }

  @GetMapping("/nickCheck")
  public int nickCheck(@RequestParam("nickname") String nickname) {
    System.out.println("nickname##########" + nickname);
    int cnt = memberService.nickCheck(nickname);
    return cnt;
  }
}
