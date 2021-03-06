# 场景
某公司要在体育馆办一场晚会，体育馆由ABCD四个区域组成，区域之间由过道分割，
每个区域第一排50个座位，隔排递增2个座位，最后一排为100个座位，具体分布如图所示：

![20200328150529](https://user-images.githubusercontent.com/7600149/78033251-b9580c80-7398-11ea-8d46-867d2387b870.jpg)

# 要求
1.用户一次性可购买1-5张票；
2.系统随机为用户分配座位。

# 解题思路：
## 分区
分为 A、B、C、D 四个扇形区域，保证每次购票时选到的座位都在一个分区内（假设过道宽度很大）。

## 座位编号
将每个扇形区域座位按照如下方式排序：
![image](https://user-images.githubusercontent.com/7600149/78037658-6b460780-739e-11ea-91a7-e31b2ede1083.png)
根据题目描述，每个扇形区域最多有 1950 个座位，按照上图顺序从 1 - 1950 为座位编号。

将二维空间上的相邻转换为一维数组的相邻，简化判断相邻的判断逻辑，缺点是不能真实的反映前后排、斜对角相邻关系，造成一次购买多张票时不能尽量买到空间上相邻的位置。

## 建立索引
用 map 结构存储 1 - 5 购票张数时剩余座位的编号

## 随机取座
随机在 1 - 1950 间获取一个座位，在它相邻的位置获取到指定张数的座位；
如果获取不到足够的张数，则尝试拆分后尝试：如一次获取 5 个连续座位没有取到足够的个数，尝试分别获取随机 1 张和 4 张连续座位，递归直到确实不能获取到足够票数时结束。这样在剩余票数不多，连续座位较少时也能让用户尽量购票成功，代价是后面参与购票的用户得到连续座位的可能性降低，但可以尽量不剩票，兼顾用户和演出方利益。

## 更新索引
每次购票成功后，更新索引，将售出的座位在 map 中去除。

## 运行用例
cd 到 src 目录；
nodejs 环境下执行: `node test.js > result`
