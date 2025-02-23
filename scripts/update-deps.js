const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 获取当前发布的包信息
const currentPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentName = currentPkg.name;
const newVersion = process.argv[2];

// 更新所有依赖此包的其他包的 package.json
glob.sync('../../packages/*/package.json').forEach(pkgPath => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  let updated = false;

  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (pkg[depType] && pkg[depType][currentName]) {
      pkg[depType][currentName] = `^${newVersion}`;
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }
});