package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.MountainInfo;

@Mapper
public interface MountainInfoDao {
  List<MountainInfo> findAll(String keyword);
  MountainInfo findByNo(int no);
  MountainInfo findByRegion(String region);
}







