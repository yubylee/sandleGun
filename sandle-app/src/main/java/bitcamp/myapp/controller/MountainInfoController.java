package bitcamp.myapp.controller;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.MountainInfoService;
import bitcamp.myapp.vo.MountainInfo;

@RestController
@RequestMapping("/mountainInfos")
public class MountainInfoController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("MountainInfoController 생성됨!");
  }

  @Autowired private MountainInfoService mountainInfoService;

  @GetMapping
  public List<MountainInfo> list(String keyword) {
    return mountainInfoService.list(keyword);
  }

  @GetMapping("{no}")
  public MountainInfo view(@PathVariable int no) {
    return mountainInfoService.get(no);
  }

  @GetMapping("/region")
  public MountainInfo view(@RequestParam("region") String region) {
    return mountainInfoService.get(region);
  }

}
