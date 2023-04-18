package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.SandleBoard;


@Mapper
public interface SandleBoardDao {
  void insert (SandleBoard sandleBoard);
  SandleBoard findByNo(int no);
  List<SandleBoard> findAll();
}
