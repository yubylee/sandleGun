package bitcamp.myapp.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.BoardLike;

@Mapper
public interface BoardLikeDao {
  void insert(BoardLike boardLike);
  void delete(BoardLike boardLike);
  void deleteBoard(int no);
  int likeState(BoardLike boardLike);
  int likeCount(int boardNo);
}