package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/users")
public class UserPageController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("UserPageController 생성됨!");
  }

  @Autowired private MemberService memberService;


  @GetMapping
  public Object list(String keyword) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.list(keyword));
  }

  @GetMapping("/view")
  public Object view(HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");
    if (loginUser != null) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData(loginUser);
    } else {
      return new RestResult()
          .setStatus(RestStatus.FAILURE);
    }
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      @RequestBody Member member) {

    log.debug(member);
    member.setNo(no);

    memberService.update(member);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/nickCheck")
  public int nickCheck(@RequestParam("nickname") String nickname) {
    System.out.println("nickname##########" + nickname);
    int cnt = memberService.nickCheck(nickname);
    return cnt;
  }
}
