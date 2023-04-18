package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Qna;

@Mapper
public interface QnaDao {
  void insert(Qna qna);
  List<Qna> findAll(String keyword);
  Qna findByNo(int no);
  int update(Qna b);
  int delete(int no);
}























