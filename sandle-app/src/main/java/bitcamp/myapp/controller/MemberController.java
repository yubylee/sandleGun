package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/members")
public class MemberController extends UserPageController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("MemberController 생성됨!");
  }

  @Autowired private MemberService memberService;

  @PostMapping
  public Object insert(@RequestBody Member member) {
    memberService.add(member);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/idCheck")
  public int idCheck(@RequestParam("email") String email) {
    System.out.println("id##########" + email);
    int cnt = memberService.idCheck(email);
    return cnt;
  }

  @Override
  @GetMapping("/nickCheck")
  public int nickCheck(@RequestParam("nickname") String nickname) {
    System.out.println("nickname##########" + nickname);
    int cnt = memberService.nickCheck(nickname);
    return cnt;
  }


}
