const $siteList = $(".siteList")
const $lastLi = $siteList.find(".lastLi")

const x = localStorage.getItem("x")  // 获取到的是字符串
const xObject = JSON.parse(x)  // 解析成对象

const weblist = xObject || [
    {logo:"A",  url: "https://www.acfun.cn"},
    {logo:"B", url: "https://www.bilibili.com"}
]

const simplify = (url) => {
   return url.replace("https://","")
     .replace("http://","")
     .replace("www.","")
     .replace(/\/.*/,'')  // 删除/开头的内容
}

const render = () => {
    $siteList.find('li:not(.lastLi)').remove()  //清除现有li, .lastLi除外

    // 遍历数组，重新渲染每个节点
    weblist.forEach((node,index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplify(node.url)}</div>
                    <div class="close">
                      <svg class="icon" >
                        <use xlink:href="#icon-delete"></use>
                      </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)

        $li.on('click',()=>{
            window.open(node.url, "_self")  // 打开网址， _self当前窗口
        })

        $li.on('click', '.close', (e)=>{
            e.stopPropagation()   // 阻止冒泡
            weblist.splice(index,1)
            render()
        })
    })
}

render()

$('.addButton')
  .on('click', ()=>{
    let url = window.prompt("请输入网址")
    
    if(url.indexOf("http")!==0){
        url = "https://" + url
    }
    
    weblist.push({logo:simplify(url)[0], logoType: "text", url:url})

    render()
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(weblist)  // 转为字符串
    window.localStorage.setItem("x", string)  // 2个参数，一个key, 一个value
}

document.addEventListener('keypress', (e)=>{
    const {key} = e
    for (let node of weblist){
        if (node.logo.toLowerCase() === key) {
            window.open(node.url, "_self")
        }
    }
})

