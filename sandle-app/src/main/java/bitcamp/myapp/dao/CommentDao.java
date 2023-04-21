package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Comment;

@Mapper
public interface CommentDao {
  int insert(Comment comment);
  Comment findByNo(int commentNo);
  List<Comment> list(int boardNo);
  void delete(int no);
  void deleteBoard(int no);
}
