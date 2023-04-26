package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.MountainInfoService;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/mountainInfos")
public class MountainInfoController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("MountainInfoController 생성됨!");
  }

  @Autowired private MountainInfoService mountainInfoService;

  @GetMapping
  public Object list(String keyword) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(mountainInfoService.list(keyword));
  }

  @GetMapping("region/{regionId}")
  public Object view(@PathVariable int regionId) {
    log.debug(regionId);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(mountainInfoService.get(regionId));
  }

  @GetMapping("region/{regionId}/{title}")
  public Object view(@PathVariable int regionId, @PathVariable String title) {
    log.debug(regionId);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(mountainInfoService.get(regionId, title));
  }
}
