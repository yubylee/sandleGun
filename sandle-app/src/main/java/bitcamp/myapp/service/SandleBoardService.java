package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.BoardFile;
import bitcamp.myapp.vo.Comment;
import bitcamp.myapp.vo.SandleBoard;

public interface SandleBoardService {
  void add(SandleBoard sandleBoard);
  SandleBoard get(int no);
  List<SandleBoard> list();

  Comment getComment(int commentNo);
  void addComment(Comment comment);
  void deleteComment(int no);

  BoardFile getFile(int fileNo);


}
