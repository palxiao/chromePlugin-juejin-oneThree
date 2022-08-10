/*
 * @Author: ShawnPhang
 * @Date: 2022-08-09 21:14:17
 * @Description: 只有打开掘金才会显示图标
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-08-09 21:14:38
 * @site: book.palxp.com
 */
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'juejin.cn' } })],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ])
  })
})
