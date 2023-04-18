package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Member;

public interface MemberService {
  void add(Member member);
  List<Member> list(String keyword);
  Member get(int no);
  Member get(String email);
  Member get(String email, String password);
  void update(Member member);
  void updateProfile(Member member);
  void delete(int no);

  int idCheck(String email);
  int nickCheck(String nickname);

}





