package bitcamp.myapp.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Member;

@Mapper
public interface MemberDao {
  void insert(Member m);
  List<Member> findAll(String keyword);
  Member findByNo(int no);
  Member findByEmail(String email);
  Member findByEmailAndPassword(Map<String, Object> paramMap);
  int update(Member m);
  int updateProfile(Member m);
  int delete(int no);
  int idCheck(String email);
  int nickCheck(String nickname);
}







