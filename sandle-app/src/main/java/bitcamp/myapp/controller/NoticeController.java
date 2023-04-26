package bitcamp.myapp.controller;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.NoticeService;
import bitcamp.myapp.vo.Notice;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/notices")
public class NoticeController {

	Logger log = LogManager.getLogger(getClass());

	{
		log.trace("NoticeController 생성됨!");
	}

	@Autowired
	private NoticeService noticeService;

	@PostMapping
	public Object insert(@RequestBody Notice notice) {
		noticeService.add(notice);
		return new RestResult()
				.setStatus(RestStatus.SUCCESS);
	}

	@GetMapping
	public Object list(@RequestParam(required = false) String keyword) {
		List<Notice> notices = noticeService.get(keyword);
		return new RestResult()
				.setStatus(RestStatus.SUCCESS)
				.setData(notices);
	}

	@GetMapping("{boardId}")
	public Object view(@PathVariable int boardId) {
		Notice notice = noticeService.get(boardId);
		if (notice != null) {

			return new RestResult()
					.setStatus(RestStatus.SUCCESS)
					.setData(notice);
		} else {
			return new RestResult()
					.setStatus(RestStatus.FAILURE)
					.setErrorCode(ErrorCode.rest.NO_DATA);
		}
	}

	@PutMapping("{boardId}")
	public Object update(
			@PathVariable int boardId,
			@RequestBody Notice notice) {

		log.debug(notice);

		// 보안을 위해 URL 번호를 게시글 번호로 설정한다.
		notice.setBoardId(boardId);

		noticeService.update(notice);
		return new RestResult()
				.setStatus(RestStatus.SUCCESS);
	}

	@DeleteMapping("{boardId}")
	public Object delete(@PathVariable int boardId) {
		noticeService.delete(boardId);
		return new RestResult()
				.setStatus(RestStatus.SUCCESS);
	}

}

