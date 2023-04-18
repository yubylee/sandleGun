package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.myapp.dao.MountainInfoDao;
import bitcamp.myapp.service.MountainInfoService;
import bitcamp.myapp.vo.MountainInfo;

@Service
public class DefaultMountainInfoService implements MountainInfoService {

  @Autowired private MountainInfoDao mountainInfoDao;

  @Override
  public List<MountainInfo> list(String keyword) {
    return mountainInfoDao.findAll(keyword);
  }

  @Override
  public List<MountainInfo> get(int regionId) {
    return mountainInfoDao.findByRegionId(regionId);
  }

}





