browser.runtime.onStartup.addListener( () => {
  browser.storage.local.set({'lastSelection': ''})
  browser.storage.local.get('active', (result) => {
    if (result.active) {
      browser.action.setIcon({path: 'Res/Icons/icon64.png'})
    } else {
      browser.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } 
  })
})

browser.runtime.onInstalled.addListener((details) => {
  /* const currentVersion = browser.runtime.getManifest().version
  const previousVersion = details.previousVersion */
  const reason = details.reason

  switch (reason) {
     case 'install':
        browser.storage.local.set({
          "active": true,
          "copyOnSelect": true,
          "bypassCopyWithCtrl": true,
          "copyOnlyWithAlt": false,
          "bypassCopyWithAlt": false,
          "includeUrl": false,
          "urlType": 'complete',
          "showCopiedAlert": true,
          "pasteOnDoubleClick": true,
          "pasteOnMiddleClick": true,
          "lastSelection": "",
          "trimSelection": false,
          "alwaysCleanField": false,
          "bypassCopyOnEditableElements": false,
          "removeEmojis": false,
          "prependText": false,
          "textToPrepend": '',
          "postpendText": false,
          "textToPostpend": ''
        }, () => {
          const browserLanguage = browser.i18n.getUILanguage().slice(0, 2)
          let guideFileName = 'welcome.html'
          switch (browserLanguage) {
            case 'it':
              guideFileName = 'welcome-it.html'
              break;
            case 'es':
              guideFileName = 'welcome-es.html'
              break;
            case 'pt':
              guideFileName = 'welcome-pt.html'
              break;  
            case 'fr':
              guideFileName = 'welcome-fr.html'
              break;  
            case 'de':
              guideFileName = 'welcome-de.html'
              break;  
            case 'pl':
              guideFileName = 'welcome-pl.html'
              break;  
            default:
              break;
          }
          browser.tabs.create({ url: browser.runtime.getURL(`${guideFileName}`) })
          setUpContextMenus()
        })
        break;
     case 'update':
        browser.storage.local.get(['active', 'copyOnSelect', 'copyOnlyWithAlt', 'showCopiedAlert', 'pasteOnDoubleClick', 'pasteOnMiddleClick', 'lastSelection', 'trimSelection', 'alwaysCleanField', 'bypassCopyOnEditableElements', 'prependText', 'textToPrepend', 'postpendText', 'textToPostpend', 'bypassCopyWithAlt', 'includeUrl', 'urlType', 'bypassCopyWithCtrl', 'removeEmojis'], (result) => {
          let active = typeof result.active == 'boolean' ? result.active : true
          let copyOnSelect = typeof result.copyOnSelect == 'boolean' ? result.copyOnSelect : true
          let bypassCopyWithCtrl = typeof result.bypassCopyWithCtrl == 'boolean' ? result.bypassCopyWithCtrl : true
          let copyOnlyWithAlt = result.copyOnlyWithAlt ? result.copyOnlyWithAlt : false
          let bypassCopyWithAlt = result.bypassCopyWithAlt ? result.bypassCopyWithAlt : false
          let includeUrl = result.includeUrl ? result.includeUrl : false
          let urlType = result.urlType ? result.urlType : 'complete'
          let showCopiedAlert = typeof result.showCopiedAlert == 'boolean' ? result.showCopiedAlert : true
          let pasteOnDoubleClick = typeof result.pasteOnDoubleClick == 'boolean' ? result.pasteOnDoubleClick : true
          let pasteOnMiddleClick = typeof result.pasteOnMiddleClick == 'boolean' ? result.pasteOnMiddleClick : true
          let lastSelection = result.lastSelection ? result.lastSelection : ""
          let trimSelection = result.trimSelection ? result.trimSelection : false
          let alwaysCleanField = result.alwaysCleanField ? result.alwaysCleanField : false
          let bypassCopyOnEditableElements = result.bypassCopyOnEditableElements ? result.bypassCopyOnEditableElements : false
          let removeEmojis = result.removeEmojis ? result.removeEmojis : false
          let prependText = result.prependText ? result.prependText : false
          let textToPrepend = result.textToPrepend && result.textToPrepend.length > 0 ? result.textToPrepend : ''
          let postpendText = result.postpendText ? result.postpendText : false
          let textToPostpend = result.textToPostpend && result.textToPostpend.length > 0 ? result.textToPostpend : ''
          browser.storage.local.set({
            "active": active,
            "copyOnSelect": copyOnSelect,
            "bypassCopyWithCtrl": bypassCopyWithCtrl,
            "copyOnlyWithAlt": copyOnlyWithAlt,
            "bypassCopyWithAlt": bypassCopyWithAlt,
            "includeUrl": includeUrl,
            "urlType": urlType,
            "showCopiedAlert": showCopiedAlert,
            "pasteOnDoubleClick": pasteOnDoubleClick,
            "pasteOnMiddleClick": pasteOnMiddleClick,
            "lastSelection": lastSelection,
            "trimSelection": trimSelection,
            "alwaysCleanField": alwaysCleanField,
            "bypassCopyOnEditableElements": bypassCopyOnEditableElements,
            "removeEmojis": removeEmojis,
            "prependText": prependText,
            "textToPrepend": textToPrepend,  
            "postpendText": postpendText,
            "textToPostpend": textToPostpend  
          }, () => {
            browser.contextMenus.removeAll(() => {
              setUpContextMenus()
            })
          })
        })
        break;
     case 'browser_update':
        break;
     case 'shared_module_update':
        break;
     default:
        
        break;
  }

})

browser.action.onClicked.addListener( () => {
  browser.storage.local.get('active', (result) => {
    if (result.active) {
      browser.storage.local.set({ 'active': false })
      browser.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } else {
      browser.storage.local.set({ 'active': true })
      browser.action.setIcon({path: 'Res/Icons/icon64.png'})
    }
  })  
})

browser.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    browser.runtime.openOptionsPage()
  }
})

const setUpContextMenus = () => {
  browser.contextMenus.removeAll(() => {
    const contextMenuHowItWorks = {
      id: 'howItWorks',
      title: browser.i18n.getMessage("context_menu_how_it_works"),
      contexts: ['action']
    }
    browser.contextMenus.create(contextMenuHowItWorks, () => browser.runtime.lastError)

    const contextMenuOpenOptionsPage = {
      id: 'copyOnSelectOpenOptionsPageContextMenu',
      title: browser.i18n.getMessage("context_menu_open_options_page"),
      contexts: ['action']
    }
    browser.contextMenus.create(contextMenuOpenOptionsPage, () => browser.runtime.lastError)

  })
}

browser.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'howItWorks') {
    const browserLanguage = browser.i18n.getUILanguage().slice(0, 2)
    let guideFileName = 'guide.html'
    switch (browserLanguage) {
      case 'it':
        guideFileName = 'guide-it.html'
        break;
      case 'es':
        guideFileName = 'guide-es.html'
        break;
      case 'pt':
        guideFileName = 'guide-pt.html'
        break;
      case 'fr':
        guideFileName = 'guide-fr.html'
        break;  
      case 'de':
        guideFileName = 'guide-de.html'
        break;  
      case 'pl':
        guideFileName = 'guide-pl.html'
        break;  
      default:
        break;
    }
      browser.tabs.create({ url: browser.runtime.getURL(`${guideFileName}`) })
  }

  if (clickData.menuItemId == 'copyOnSelectOpenOptionsPageContextMenu') {
    browser.runtime.openOptionsPage()
  }
})
