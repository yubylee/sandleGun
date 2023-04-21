//package bitcamp.myapp.service.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import bitcamp.myapp.dao.BoardLikeDao;
//import bitcamp.myapp.service.BoardLikeService;
//import bitcamp.myapp.vo.BoardLike;
//
//public class DefaultBoardLikeService implements BoardLikeService {
//
//  @Autowired private BoardLikeDao boardLikeDao;
//
//  @Override
//  public void like(BoardLike boardLike) {
//    boardLikeDao.insert(boardLike);
//
//  }
//
//  @Override
//  public void disLike(BoardLike boardLike) {
//    boardLikeDao.delete(boardLike);
//  }
//}
