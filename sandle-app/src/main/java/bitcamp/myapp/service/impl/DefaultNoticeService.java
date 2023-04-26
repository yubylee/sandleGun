package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.NoticeDao;
import bitcamp.myapp.service.NoticeService;
import bitcamp.myapp.vo.Notice;

@Service
public class DefaultNoticeService implements NoticeService {

  @Autowired private NoticeDao noticeDao;

  @Transactional
  @Override
  public void add(Notice notice) {
    noticeDao.insert(notice);
  }

  @Override
  public List<Notice> get(String keyword) {
    return noticeDao.findAll(keyword);
  }

  @Override
  public Notice get(int boardId) {
    return noticeDao.findByNo(boardId);
  }

  @Transactional
  @Override
  public void update(Notice notice) {
    if (noticeDao.update(notice) == 0) {
      throw new RuntimeException("해당하는 공지사항이 없습니다.");
    }
  }

  @Transactional
  @Override
  public void delete(int boardId) {
    if (noticeDao.delete(boardId) == 0) {
      throw new RuntimeException("해당하는 공지사항이 없습니다.");
    }
  }

}
