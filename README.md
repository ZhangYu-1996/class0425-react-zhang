* react第三天
  * find返回对象
  * map 返回新[]
  * 刷新时间用github里面的dayjs
  * 使用josp去github里面找
  * 更新状态(只运行一次)的话在componentDidMount设置函数
    * 初始化会走的生命周期函数
  * 初始化和更新都会走的生命周期函数 static getDerivedStateFromProps(nextProps, prevState) 
     * 设置static之后不能使用this
  * 用到了antd中的Card，Table，Pagination
  * 下午用到antd的Form，Table，Modal
     * 父组件获取子组件的数据，使用了ref。[...this.xxx,res];  
  
* react第四天
    * withRouter是一个高阶组件：负责给LeftNav传递路由组件的三大属性
      export default withRouter(LeftNav); 
    * 获取子组件的form属性 --> ref
         * ref 如果设置的是 普通虚拟DOM对象 得到的是真实DOM元素
         * ref 如果设置的是 组件 得到的是组件的实例对象  
    *  添加分类的逻辑
         * 如果在一级分类：
                  添加一级分类数据，更新 categories
                  添加二级分类数据，不更新
         * 如果在二级分类
                  添加一级分类数据，更新 categories
                  添加二级分类数据，如果当前的一级分类和要更新的一级分类一样，才更新 subCategories
  
         *  总结：
                  一级分类必须更新
                  二级分类，满足如果当前的一级分类和要更新的一级分类一样，才更新
                               
    *  为了给AddCategoryForm传递一个form属性
       *  export default Form.create()(AddCategoryForm);               
* react第五天
    * startsWith 以...开头
    * react-draft 在github搜索，富文本编译器
    * ！！值 强行转化为布尔值
    * promise.all条件都成功时触发  
    * product可以再location.state中获取
       * this.props.history.push('/product/saveupdate', product);
       