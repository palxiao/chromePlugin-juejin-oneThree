;(() => {
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.src = 'https://cdn.jsdelivr.net/npm/@mojs/core@1.3.0/dist/mo.umd.min.js'
  //   document.getElementsByTagName('head')[0].appendChild(script)

  function follow() {
    const $followBtn = document.querySelector('.article-area .follow-button')
    try {
      if (!$followBtn.className.includes('followed')) {
        $followBtn.click()
      }
    } catch (error) {
      console.log('啊哦，好像没找到关注按钮 --> ')
    }
  }

  function collect() {
    const $collectBtn = document.querySelectorAll('.article-suspended-panel .panel-btn')[2]
    if (!$collectBtn.className.includes('active')) {
      $collectBtn?.click()
    }

    const timer = window.setInterval(() => {
      const $checkbox = document.querySelector('.byte-modal__body .checkbox-icon')
      if ($checkbox) {
        $checkbox.click()
        window.setTimeout(() => {
          const $submitBtn = document.querySelector('.byte-modal__body .confirm-btn')
          $submitBtn.click()
        }, 100)
        window.clearInterval(timer)
      }
    }, 100)
  }

  function createCircle() {
    const fragment = document.createElement('div')
    fragment.classList.add('circle_process')
    fragment.innerHTML = `<div class="wrapper right">
        <div class="circle rightcircle"></div>
    </div>
    <div class="wrapper left">
        <div class="circle leftcircle"></div>
    </div>`
    return fragment
  }

  function play(parent, cb) {
    new window.mojs.Burst({
      // 爆裂范围 {从多大 : 到多大}
      radius: { 0: 50 },
      // 动画挂载的父元素, 如果不填默认挂载到 <body>
      parent,
      // 动画延迟的贝塞尔曲线函数
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      // 动画延迟时间
      duration: 1500,
      // 在动画动之前等待的时间 (这里一般设置150ms方便减少低端机型可能会存在的卡顿)
      delay: 300,
      // 扩散的粒子配置
      children: {
        duration: 750,
        // 粒子大小变换 {从多大 : 到多大}
        // rand(from, to) rand函数可以帮我们随机出一个区间的值
        radius: { 0: 'rand(5, 25)' },
        // 形状选择, 这里我们选择了 “圆形”
        shape: 'circle',
        // 粒子可选的填充色
        fill: ['#1abc9c', '#2ecc71', '#00cec9', '#3498db', '#9b59b6', '#fdcb6e', '#f1c40f', '#e67e22', '#e74c3c', '#e84393'],
      },
      // 透明度
      opacity: 0.6,
      // 生成的粒子数量
      count: 12,
      onStart() {
        // 动画触发前的钩子函数
      },
      onComplete() {
        // 动画完成后的钩子函数
        cb && cb()
      },
    }).play()
  }

  let doms = []
  let timeStamp = 0
  let press = false
  let timer = null

  const likeBtn = document.querySelector('.article-suspended-panel .panel-btn')
  likeBtn?.addEventListener('mousedown', () => {
    if (likeBtn.className.includes('active')) {
      return
    }
    press = true
    timeStamp = new Date().getTime() / 1000
    likeBtn.classList.add('shaking')
    doms.push(createCircle(), createCircle())
    document.getElementsByClassName('panel-btn')[0].appendChild(doms[0])
    document.getElementsByClassName('panel-btn')[2].appendChild(doms[1])
    timer = setTimeout(() => {
      press = false
      done()
    }, 2000)
  })
  likeBtn?.addEventListener('mouseup', () => {
    clearTimeout(timer)
    if (press === false) {
      return
    } else press = false
    likeBtn.click()
    done()
  })

  function done() {
    const now = new Date().getTime() / 1000
    const pass = now - timeStamp > 1.9
    likeBtn.classList.remove('shaking') // 移除震动
    for (const iterator of doms) {
      // 移除圆环
      iterator.remove()
    }
    if (likeBtn.className.includes('active')) {
      return
    }
    if (pass) {
      play(likeBtn, () => {
        play(document.getElementsByClassName('panel-btn')[2])
      })
      !likeBtn.className.includes('active') && likeBtn.classList.add('active')
      follow()
      collect()
    }
  }
})()
