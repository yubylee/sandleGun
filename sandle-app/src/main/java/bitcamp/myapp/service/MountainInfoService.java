package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.MountainInfo;

public interface MountainInfoService {
  List<MountainInfo> list(String keyword);
  List<MountainInfo> get(int regionId);
}





