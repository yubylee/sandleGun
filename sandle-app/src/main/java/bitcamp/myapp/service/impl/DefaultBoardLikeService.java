package bitcamp.myapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.myapp.dao.BoardLikeDao;
import bitcamp.myapp.service.BoardLikeService;
import bitcamp.myapp.vo.BoardLike;

@Service
public class DefaultBoardLikeService implements BoardLikeService {

  @Autowired private BoardLikeDao boardLikeDao;

  @Override
  public void like(BoardLike boardLike) {
    boardLikeDao.insert(boardLike);
  }

  @Override
  public int likeCount(int boardNo) {
    return boardLikeDao.likeCount(boardNo);
  }

  @Override
  public void disLike(BoardLike boardLike) {
    boardLikeDao.delete(boardLike);
  }

  @Override
  public boolean likeState(BoardLike boardLike) {
    if(boardLikeDao.likeState(boardLike) == 1) {
      return true;
    }
    return false;
  }


}