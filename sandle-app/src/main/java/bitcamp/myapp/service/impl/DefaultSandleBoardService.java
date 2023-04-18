package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.BoardFileDao;
import bitcamp.myapp.dao.CommentDao;
import bitcamp.myapp.dao.SandleBoardDao;
import bitcamp.myapp.service.SandleBoardService;
import bitcamp.myapp.vo.BoardFile;
import bitcamp.myapp.vo.Comment;
import bitcamp.myapp.vo.SandleBoard;

@Service
public class DefaultSandleBoardService implements SandleBoardService{
  @Autowired private SandleBoardDao sandleBoardDao;
  @Autowired private CommentDao commentDao;
  @Autowired private BoardFileDao boardFileDao;

  @Transactional
  @Override
  public void add(SandleBoard sandleBoard) {
    sandleBoardDao.insert(sandleBoard);

    if (sandleBoard.getAttachedFiles().size() > 0) {
      for (BoardFile boardFile : sandleBoard.getAttachedFiles()) {
        boardFile.setBoardNo(sandleBoard.getNo());
      }
      boardFileDao.insertList(sandleBoard.getAttachedFiles());
    }
    //    BoardFile boardFile = new BoardFile();
    //    boardFile.setBoardNo(sandleBoard.getNo());
    //    boardFile.setFileName(sandleBoard.getPhoto());
    //
    //    boardFileDao.insert(boardFile);
  }

  @Override
  public BoardFile getFile(int fileNo) {
    return boardFileDao.findByNo(fileNo);
  }

  @Override
  public SandleBoard get(int no) {

    SandleBoard b = sandleBoardDao.findByNo(no);
    b.setComments(commentDao.list(no));
    //    if (b != null) {
    //      boardDao.increaseViewCount(no);
    //    }
    return b;
  }
  @Override
  public List<SandleBoard> list() {
    return sandleBoardDao.findAll();
  }

  @Override
  public Comment getComment(int commentNo) {
    return commentDao.findByNo(commentNo);
  }

  @Override
  public void addComment(Comment comment) {
    commentDao.insert(comment);
  }

  @Override
  public void deleteComment(int no) {
    commentDao.delete(no);
  }
}
