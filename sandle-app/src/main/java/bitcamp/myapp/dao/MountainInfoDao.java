package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import bitcamp.myapp.vo.MountainInfo;

@Mapper
public interface MountainInfoDao {
  List<MountainInfo> findAll(String keyword);
  List<MountainInfo> findByRegionId(int regionId);
  List<MountainInfo> findByRegionIdAndAddress(@Param("regionId") int regionId, @Param("title") String title);
}







