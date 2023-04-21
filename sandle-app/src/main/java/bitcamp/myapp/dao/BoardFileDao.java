package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.BoardFile;
import bitcamp.myapp.vo.SandleBoard;

@Mapper
public interface BoardFileDao {
  int insert(BoardFile boardFile);
  int insertList(List<BoardFile> boardFiles);
  List<BoardFile> findAllOfBoard(int boardNo);
  BoardFile findByNo(int boardFileNo);
  int delete(int no);
  int deleteOfBoard(int boardNo);
  int updatePhoto(SandleBoard sandleBoard);
}
