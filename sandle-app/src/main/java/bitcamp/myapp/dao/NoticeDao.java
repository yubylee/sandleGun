package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Notice;

@Mapper
public interface NoticeDao {
  void insert(Notice notice);
  List<Notice> findAll(String keyword);
  Notice findByNo(int boardId);
  int update(Notice notice);
  int delete(int boardId);
}
