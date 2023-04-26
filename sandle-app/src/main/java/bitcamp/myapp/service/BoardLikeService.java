package bitcamp.myapp.service;

import bitcamp.myapp.vo.BoardLike;

public interface BoardLikeService {
  void like(BoardLike boardLike);
  void disLike(BoardLike boardLike);
  boolean likeState(BoardLike boardLike);
  int likeCount(int boardNo);
}