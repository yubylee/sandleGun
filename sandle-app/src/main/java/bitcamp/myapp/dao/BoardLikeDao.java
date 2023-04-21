package bitcamp.myapp.dao;

import bitcamp.myapp.vo.BoardLike;

public interface BoardLikeDao {
  void insert(BoardLike boardLike);
  void delete(BoardLike boardLike);
}
