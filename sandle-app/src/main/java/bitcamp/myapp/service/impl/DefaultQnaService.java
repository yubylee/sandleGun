package bitcamp.myapp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bitcamp.myapp.dao.QnaDao;
import bitcamp.myapp.service.QnaService;
import bitcamp.myapp.vo.Qna;

@Service
public class DefaultQnaService implements QnaService {

	@Autowired private QnaDao qnaDao;
	//  @Autowired private QnaFileDao qnaFileDao;

	@Transactional
	@Override
	public void add(Qna qna) {

		qnaDao.insert(qna);

		//    if (qna.getAttachedFiles().size() > 0) {
		//      for (QnaFile qnaFile : qna.getAttachedFiles()) {
		//        qnaFile.setQnaNo(qna.getNo());
		//      }
		//        qnaFileDao.insertList(qna.getAttachedFiles());
		//  }
	}

	@Override
	public List<Qna> list(String keyword) {
		return qnaDao.findAll(keyword);
	}

	@Override
	public Qna get(int no) {
		return qnaDao.findByNo(no);
	}

	@Transactional
	@Override
	public void update(Qna qna) {
		if (qnaDao.update(qna) == 0) {
			throw new RuntimeException("게시글이 존재하지 않습니다!");
		}
		//    if (qna.getAttachedFiles().size() > 0) {
		//      qnaFileDao.insertList(qna.getAttachedFiles());
		//    }
	}

	@Transactional
	@Override
	public void delete(int no) {
		//    qnaFileDao.deleteOfQna(no);
		if (qnaDao.delete(no) == 0) {
			throw new RuntimeException("게시글이 존재하지 않습니다!");
		}
	}


	//  @Override
	//  public QnaFile getFile(int fileNo) {
	//    return qnaFileDao.findByNo(fileNo);
	//  }
	//
	//  @Override
	//  public void deleteFile(int fileNo) {
	//    qnaFileDao.delete(fileNo);
	//  }
}





