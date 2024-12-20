import React from "react";
import styles from "./privacy-policy-modal.module.scss";
import { X } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { cn } from "@/src/utils/class.utils";

const PrivacyPolicyModal = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return (
    <div className={styles["privacy__policy--main-con"]}>
      <div
        className={cn(
          `${styles["header__container"]}
          nu-w-full nu-flex nu-ai-center nu-jc-sb nu-px-10`
        )}
      >
        <p className={styles["header__text"]}>Terms & Conditions</p>
        <X
          size={IconSize.L}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCloseClick();
            }
          }}
          onClick={onCloseClick}
          role="button"
          tabIndex={0}
        />
      </div>
      <div className={styles["terms__main-container"]}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorum
          inventore dolor perspiciatis nisi non vero voluptatum nihil
          repellendus excepturi. Libero omnis facilis non dicta molestiae
          ratione, aut animi consequatur. Tempora consequuntur tenetur pariatur,
          voluptas nobis quam sunt, libero reprehenderit eos eveniet illo earum
          excepturi atque debitis alias impedit praesentium enim accusantium.
          Doloribus officiis esse ut ratione facere temporibus non. Dolores
          quibusdam illum iste, quisquam ad dignissimos sit cupiditate vero
          numquam tempora adipisci labore veritatis incidunt aliquid officiis
          odio nostrum harum expedita quasi, accusamus, exercitationem similique
          eaque. Mollitia, laboriosam rem. Corrupti consectetur recusandae
          repellat et esse, maiores vitae debitis eveniet officiis dolorum
          tempora nostrum fugit nihil non ipsum temporibus consequatur, quia
          praesentium pariatur iste illo fuga ipsa molestiae. Mollitia, iste.
          Magnam voluptatem eius placeat qui molestiae deserunt iste similique
          quibusdam. Distinctio veritatis dolorem deleniti aliquid sit provident
          voluptatem quos vero. Vitae dolore quia impedit architecto quo neque
          inventore, non sequi. Dolor sit ipsa fugiat quidem architecto
          distinctio vitae error necessitatibus! Reprehenderit, maxime quia?
          Placeat, optio dolore? Deserunt dignissimos eos fugit saepe recusandae
          veritatis optio facilis doloribus consequuntur, blanditiis eaque
          laboriosam. Odio culpa, eaque mollitia praesentium quisquam eveniet
          assumenda sint, molestias vero est fuga temporibus aliquam fugiat
          rerum soluta hic officiis nobis voluptatum magni harum consequatur
          unde autem. Eveniet, eos voluptate? Dignissimos, ipsa omnis? Qui
          laboriosam quaerat quis? Officiis ratione incidunt quia quae!
          Obcaecati labore saepe harum animi culpa veritatis officiis nisi
          suscipit voluptates, magni assumenda corporis, id aperiam adipisci
          quibusdam? Quas necessitatibus, recusandae expedita placeat at vitae
          adipisci neque voluptas quasi assumenda quo nobis modi ab ducimus eum
          mollitia repellendus quisquam voluptatem molestiae, harum consectetur!
          Ullam corrupti ducimus neque ratione. Tenetur sint, aut possimus
          officia perferendis molestias tempora quaerat quod excepturi officiis
          alias. Veniam, alias commodi beatae nobis voluptatem vero quo! Minima
          numquam officia blanditiis! Laudantium nisi debitis sapiente
          recusandae. Velit voluptas quaerat, amet laborum nesciunt illum
          architecto magni ipsa ea expedita placeat quia porro voluptatum labore
          voluptatibus numquam fuga officia! Voluptatibus deleniti tempore quos
          optio magnam earum assumenda nesciunt. Exercitationem optio earum
          blanditiis magnam assumenda aliquam natus accusantium velit quasi
          pariatur, provident, sed odio a aperiam cumque, rem aut et quidem
          consequatur at vero consectetur quaerat dolorum laudantium!
          Consequuntur? Eveniet soluta aliquid magni sequi velit rerum neque
          earum minima aliquam, amet nisi explicabo ad blanditiis rem ut tenetur
          mollitia suscipit? Error recusandae accusantium impedit natus
          voluptatem alias tempora adipisci? Magnam repellat, exercitationem
          rerum eaque consequatur sit quisquam deserunt. Quidem illum,
          voluptatibus voluptatum id officiis maiores corporis reiciendis autem
          minus nulla dolores, velit explicabo exercitationem dolor ipsum sequi!
          Illum, voluptatum! Impedit distinctio architecto optio vel libero
          necessitatibus doloremque! Numquam officiis sequi minus adipisci
          itaque neque, iusto, laudantium nostrum dolor quas ipsam. Esse
          similique adipisci non doloribus autem nisi, eius vitae. Tempora sequi
          dolores, cum libero harum maxime consequatur quos ipsam corrupti
          doloremque, repellendus, labore delectus officia unde nemo aliquid
          asperiores expedita aperiam! Eum voluptatem veritatis ipsum culpa
          asperiores natus illum? Cumque nulla non maiores iusto nesciunt
          mollitia, molestias exercitationem. Saepe illum libero quae quam
          itaque commodi aperiam corrupti, asperiores magni, totam quas velit
          obcaecati sint illo quis cumque modi labore. Similique nihil repellat
          a ipsa pariatur error possimus vel rerum blanditiis quia, mollitia hic
          nam officia? Sunt repudiandae fugit exercitationem itaque, nesciunt
          esse voluptatum ad expedita facere consequuntur cumque maxime. Nisi
          deleniti soluta ex ratione consequuntur natus expedita cumque, totam
          amet nobis dicta aperiam dolor iste sequi consequatur ut distinctio
          odio enim quidem possimus ipsa, ipsum magnam? Facere, commodi ab! Sit,
          nostrum in? Est dolore eos perferendis corporis molestias fugit, nisi
          numquam, quibusdam itaque aliquam esse distinctio magnam pariatur
          consectetur aut error dignissimos doloribus sapiente aperiam
          laudantium at officiis sed. Ipsam unde enim eos fugiat, mollitia
          dignissimos incidunt quos dicta, in necessitatibus iure ipsa? Aperiam
          quis error, illum obcaecati veniam nobis iure corporis tempora aut
          nesciunt voluptatibus voluptate dolorem impedit! Nostrum commodi odio
          tempore laudantium asperiores voluptatibus non ex, voluptates in
          repudiandae maxime? Non dignissimos incidunt, laboriosam
          necessitatibus qui quasi ad similique error exercitationem quos, totam
          vitae iusto, sed iste. Deleniti itaque modi repellat dolore excepturi
          beatae laboriosam corrupti amet illo vel non dolorem, ratione autem?
          Ea, labore, reiciendis vitae laboriosam distinctio blanditiis
          laudantium deleniti non obcaecati magni, velit odio. Praesentium
          minima placeat eum officiis modi laudantium dignissimos aperiam at
          quas. Natus, consectetur quo culpa harum aspernatur ut nobis modi non
          possimus eius odio molestias rem alias delectus in mollitia. Fuga et
          perferendis aliquam? Ea saepe impedit cumque at tempora. Molestiae
          corporis ipsum adipisci explicabo minima velit animi maxime aliquid
          cumque omnis! Odit molestiae, repudiandae enim voluptatibus quidem
          ducimus beatae. Aliquid in porro voluptas repudiandae impedit ex omnis
          cumque doloribus voluptate fugit unde molestias architecto aliquam,
          rerum, dolorum ad voluptatum neque officia molestiae cum accusantium.
          Numquam et voluptatibus dignissimos quasi? Obcaecati magnam iste sint
          rerum minima voluptatem facilis quos vel optio ullam. Maxime debitis
          dolor modi esse illo cum quam, dolores, quia nemo nisi dolorem minima
          reprehenderit molestiae in quos. Sapiente laudantium tempora ut nisi
          obcaecati! Sunt quas ea eaque nesciunt quibusdam molestias. Rerum
          praesentium ullam minima ducimus, modi odio accusantium totam aut ab,
          nemo architecto expedita esse impedit eum. Nesciunt corrupti nobis
          doloremque vitae odit eveniet repellendus consequatur beatae, animi,
          asperiores qui quasi enim nisi consectetur tenetur quod blanditiis
          fuga neque ullam, ratione dignissimos ab? Id inventore et quisquam!
          Explicabo maiores error eligendi aliquid necessitatibus repellendus,
          velit laborum iusto doloribus vel, libero officia cum voluptas ab rem
          fugiat repellat distinctio tempore. Explicabo delectus vitae doloribus
          praesentium sapiente magni laboriosam. Iusto, nostrum hic sapiente
          officia fugiat consequatur autem dolorum tempora rerum eaque explicabo
          eum est asperiores veniam deserunt. Ab eos veniam beatae delectus
          labore obcaecati, iusto nostrum est non necessitatibus! Perspiciatis,
          animi ratione expedita sit nihil fuga alias eos magnam unde voluptates
          voluptas temporibus. Explicabo, repellat eius corrupti necessitatibus
          omnis quaerat nobis ipsa modi nemo vero maiores voluptate nostrum
          commodi? Magnam corrupti, quis earum iste a placeat dolorum dolore
          minima recusandae quo et qui quaerat odit perferendis ipsam est illum
          voluptatum eaque doloremque consectetur mollitia ipsum. Nam officiis
          sequi veritatis. Fugit temporibus odio ducimus accusamus fuga, illum
          delectus nam corrupti. Blanditiis quae quibusdam adipisci nemo debitis
          eaque doloribus corrupti magni porro! Fugit doloremque, non sed et
          esse voluptatibus voluptates inventore? Ipsam tenetur officiis quis
          quo asperiores magnam sunt, doloremque nemo quos deleniti porro
          molestias libero aspernatur cumque quas dignissimos debitis
          perspiciatis itaque. Pariatur aut illum nesciunt quasi, velit minima
          vel. Sapiente deserunt officia aut autem, minima in sed eveniet
          placeat aspernatur dolorem vero omnis eos eius architecto fuga et
          veritatis similique fugit, sint corporis cum iusto beatae? Facere,
          labore architecto. Officia doloribus laudantium ea fuga libero? Amet
          quasi officiis, autem reiciendis, neque nihil placeat modi aspernatur
          maxime officia voluptatem adipisci quaerat ducimus optio dolore,
          exercitationem veritatis consequatur nisi natus. Error. Fugiat
          mollitia iure magnam, ratione consequatur, nostrum accusantium vero
          aliquam aspernatur recusandae inventore molestias eos aperiam sunt
          nemo atque veritatis nisi commodi nam ea perspiciatis, quo deleniti!
          Porro, non quidem. Tempore fuga ratione accusantium iste. Nisi
          deserunt fuga tempore voluptates. Incidunt porro vitae commodi sint
          aperiam voluptatum aspernatur, ratione nobis pariatur dolorem est sed,
          quibusdam inventore dicta? Maxime, tempore voluptatum. Recusandae
          numquam odio doloremque explicabo similique quam laborum, ut possimus
          officiis assumenda doloribus? Eos placeat non nam unde, ab temporibus
          quo nisi facilis recusandae dicta sapiente, odit natus dolorem
          maiores?
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
