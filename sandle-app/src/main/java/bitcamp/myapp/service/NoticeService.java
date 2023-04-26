package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Notice;

public interface NoticeService {
  void add(Notice notice);
  List<Notice> get(String keyword);
  Notice get(int boardId);
  void update(Notice notice);
  void delete(int boardId);
}
